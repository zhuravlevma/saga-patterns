# Epic Saga

## General

![image](https://github.com/zhuravlevma/saga-patterns/assets/44276887/668081d6-5d5f-4143-92c4-73e639396111)

```mermaid
flowchart LR

C["Client"]-->|wait http call|O["orchestrator"]
O-->|wait http call|D1["domain service #1"]
O-->|wait http call|D2["domain service #2"]
O-->|wait http call|D3["domain service #3"]
```
