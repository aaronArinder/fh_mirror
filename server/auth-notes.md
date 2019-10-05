#### Registering
Register with
```
curl localhost:8080/register -d '{"username":"aaron","password":"password","first_name":"aaron","last_name":"arinder","dob":"1989-01-12","sex":"male"}' -H "Content-Type: application/json"
```

#### Login
Login with the curl command below. Make sure to keep the verbose flag to actually see your JWT, which is needed for testing that the login worked.
```
curl -c cookies localhost:8080/login -d '{"username":"aaron","password":"password"}' -H "content-type: application/json" -v
```

#### Test auth
Test auth with
```
curl localhost:8080/test-auth -H "authorization: bearer JWT_TOKEN_HERE"
```
