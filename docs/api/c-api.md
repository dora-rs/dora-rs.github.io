# C API

## `init_dora_context_from_env`

`init_dora_context_from_env` initiate a node from environment variables set by `dora-coordinator`

```c
void *dora_context = init_dora_context_from_env();
```

## `dora_next_event`

`dora_next_event` waits for the next event (e.g. an input). Use `read_dora_event_type` to read the event's type. Inputs are of type `DoraEventType_Input`. To extract the ID and data of an input event, use `read_dora_input_id` and `read_dora_input_data` on the returned pointer. It is safe to ignore any events and handle only the events that are relevant to the node.

```c
void *input = dora_next_input(dora_context);

// read out the ID as a UTF8-encoded string
char *id;
size_t id_len;
read_dora_input_id(input, &id, &id_len);

// read out the data as a byte array
char *data;
size_t data_len;
read_dora_input_data(input, &data, &data_len);
```

## `dora_send_output`

`dora_send_output` send data from the node.

```c
char out_id[] = "tick";
char out_data[50];
dora_send_output(dora_context, out_id, strlen(out_id), out_data, out_data_len);
```

#### Try it out!

- Create an `node.c` file:

```c
#include <stdio.h>
#include <string.h>
#include <assert.h>
#include "../../apis/c/node/node_api.h"

// sleep
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

int main()
{
    printf("[c node] Hello World\n");

    void *dora_context = init_dora_context_from_env();
    if (dora_context == NULL)
    {
        fprintf(stderr, "failed to init dora context\n");
        return -1;
    }

    printf("[c node] dora context initialized\n");

    for (char i = 0; i < 100; i++)
    {
        void *event = dora_next_event(dora_context);
        if (event == NULL)
        {
            printf("[c node] ERROR: unexpected end of event\n");
            return -1;
        }

        enum DoraEventType ty = read_dora_event_type(event);

        if (ty == DoraEventType_Input)
        {
            char *data;
            size_t data_len;
            read_dora_input_data(event, &data, &data_len);

            assert(data_len == 0);

            char out_id[] = "message";
            char out_data[50];
            int out_data_len = sprintf(out_data, "loop iteration %d", i);

            dora_send_output(dora_context, out_id, strlen(out_id), out_data, out_data_len);
        }
        else if (ty == DoraEventType_Stop)
        {
            printf("[c node] received stop event\n");
        }
        else
        {
            printf("[c node] received unexpected event: %d\n", ty);
        }

        free_dora_event(event);
    }

    printf("[c node] received 10 events\n");

    free_dora_context(dora_context);

    printf("[c node] finished successfully\n");

    return 0;
}
```

**Build the custom nodes:**

- Create a `build` folder in this directory (i.e., next to the `node.c` file)
- Compile the `dora-node-api-c` crate into a static library.
  - Run `cargo build -p dora-node-api-c --release`
  - The resulting staticlib is then available under `../../target/release/libdora-node-api-c.a`.
- Compile the `node.c` (e.g. using `clang`) and link the staticlib
  - For example, use the following command:
    ```
    clang node.c <FLAGS> -ldora_node_api_c -L ../../target/release --output build/c_node
    ```
  - The `<FLAGS>` depend on the operating system and the libraries that the C node uses. The following flags are required for each OS:
    - Linux: `-lm -lrt -ldl -pthread`
    - macOS: `-framework CoreServices -framework Security -l System -l resolv -l pthread -l c -l m`
    - Windows:
      ```
      -ladvapi32 -luserenv -lkernel32 -lws2_32 -lbcrypt -lncrypt -lschannel -lntdll -liphlpapi
      -lcfgmgr32 -lcredui -lcrypt32 -lcryptnet -lfwpuclnt -lgdi32 -lmsimg32 -lmswsock -lole32
      -lopengl32 -lsecur32 -lshell32 -lsynchronization -luser32 -lwinspool
      -Wl,-nodefaultlib:libcmt -D_DLL -lmsvcrt
      ```
      Also: On Windows, the output file should have an `.exe` extension: `--output build/c_node.exe`
- Repeat the previous step for the `sink.c` executable

- Link it in your graph as:

```yaml
- id: c_sink
  custom:
    source: build/c_sink
    inputs:
      counter: runtime-node/c_operator/counter
```
