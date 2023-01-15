# NOT FOUND
GET http://localhost:3000

HTTP/1.1 404
[Asserts]
jsonpath "$.error" == "/ not found"

# User
GET http://localhost:3000/user/1

HTTP/1.1 404
