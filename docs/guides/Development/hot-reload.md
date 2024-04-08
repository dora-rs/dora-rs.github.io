# Hot Reloading

Making development of robotic application fast and easy is at the core of our thinking for dora-rs.

To reduce development time, we have added a `hot-reload` option for Python Operators that enables dora-rs to watch for changes.

This is implemented in the likes of `npm start` or `uvicorn main:app --reload`

## Purpose

Sometimes reloading a robotic environment ( both virtual and physical ) might be really time-consuming.
Being able to hot-reload an operator makes iteration on change a lot quicker.

## Usage

```bash
dora start dataflow.yaml --attach --hot-reload
```

## Fail-safe mechanism

- Failing the initialization on reloading is going to abort the reloading and not crash the operator.
- State-values stored in the before-reloading Operator will be forwarded to the reloaded operator.
- If new state-value is been set in the initialization, they will be available in the reloaded operator.
- If state-value has been changed in the initialization but was already used before, they will keep their before-reloading value ( used or not ). It is therefore not possible to change currently being used state-value stored in the Operator class.
- You can use global variable if you wish to have 'changeable' variables.

## Demo

You can see a quick demo here:

<center>
<a href="https://www.youtube.com/watch?v=NvvTEP8Jak8">
<img alt="demo" src="https://img.youtube.com/vi/NvvTEP8Jak8/0.jpg"/>
</a>
</center>
