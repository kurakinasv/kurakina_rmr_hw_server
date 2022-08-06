## Successful Auth For Logged In User

---

```mermaid
sequenceDiagram
    actor U as User
    participant C as :Client
    participant S as :Server
    participant DB as :Database

    U ->>+ C: Enters page
    activate U

    C ->>+ S: sendCookie()

    S ->> DB: getUserInfo(sessionToken)
    activate DB
    DB -->> S: sendUserInfo()
    deactivate DB

    S -->>- C: startSession()

    C -->>- U: Shows a cat
    deactivate U
```
