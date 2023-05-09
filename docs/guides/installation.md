# Installation

This project is in early development, and many features have yet to be implemented with breaking changes. Please don't take for granted the current design. The installation process will be streamlined in the future.

## Github Releases


Install `dora` binaries from GitHub releases:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="current-os" queryString>
  <TabItem value="linux" label="Linux">

```bash
export DORA_VERSION=v0.2.2 # Check for the latest release
export ARCHITECTURE=$(uname -m)
wget https://github.com/dora-rs/dora/releases/download/${DORA_VERSION}/dora-${DORA_VERSION}-${ARCHITECTURE}-Linux.zip
unzip dora-${DORA_VERSION}-${ARCHITECTURE}-Linux.zip
python3 -m pip install dora-rs==${DORA_VERSION} ## For Python API
PATH=$PATH:$(pwd)
dora --help
```

  </TabItem>
  <TabItem value="macos" label="MacOS">

```bash
export DORA_VERSION=v0.2.2 # Check for the latest release
export ARCHITECTURE=x86_64
wget https://github.com/dora-rs/dora/releases/download/${DORA_VERSION}/dora-${DORA_VERSION}-${ARCHITECTURE}-macOS.zip
unzip dora-${DORA_VERSION}-${ARCHITECTURE}-macOS.zip
python3 -m pip install dora-rs==${DORA_VERSION} ## For Python API
PATH=$PATH:$(pwd)
dora --help
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
set DORA_VERSION=v0.2.2 # Check for the latest release
set ARCHITECTURE=x86_64
wget https://github.com/dora-rs/dora/releases/download/%DORA_VERSION%/dora-%DORA_VERSION%-%ARCHITECTURE%-Windows.zip
unzip dora-%DORA_VERSION%-%ARCHITECTURE%-Windows.zip
python3 -m pip install dora-rs==%DORA_VERSION% ## For Python API
set PATH=%PATH%:%cd%
dora --help
```

  </TabItem>
</Tabs>


## Cargo

```bash
cargo install dora-cli
cargo install dora-coordinator
cargo install dora-daemon
python3 -m pip install dora-rs ## For Python API
```
