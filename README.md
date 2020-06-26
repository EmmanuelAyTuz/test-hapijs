# test-hapijs

---

### Init

Install the **dependencies** and **devDependencies** and start the API.

```sh
$ git clone https://github.com/EmmanuelAyTuz/test-hapijs.git
$ cd test-hapijs
$ npm install
$ npm run dev
```

### Environments

Rename file _.env.example_ to _.env_

## Test endpoints

First send a [GET / init][get_init] (Generate a default User)
Login with "POST / login" body {username: "Admin", password: "Admin"}

- Test methods
  - [GET][get_test] /
  - POST /
  - PUT /
  - DELETE /

> In the other endpoints with POST, PUT & DELETE header use software such as "Insomia" or "Postman"

### Endpoints

If you are logged in as Admin you will access all the endpoints instead if you log in as User it will only access the endpoints of it.
| Method | Endpoint | Body | Params | User | Admin | Auth |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| POST | / | | | _ | _ | _ |
| GET | / | | | _ | _ | _ |
| PUT | / | | | _ | _ | _ |
| DELETE | / | | | _ | _ | _ |
| GET | /init | | | | | |
| POST | /login | { username, password } | | _ | _ | |
| POST | /{version}/user/create | { username, password } | | _ | _ | |
| GET | /{version}/user/all | | | _ | _ | _ |
| GET | /{version}/user/ | | { id } | _ | _ | _ |
| PUT | /{version}/user/ | { username, password } | { id } | _ | _ | _ |
| DELETE | /{version}/user/ | | { id } | _ | _ | _ |
| POST | /{version}/admin/user/create | { username, password, isAdmin } | | | _ | _ |
| GET | /{version}/admin/user/all | | | | _ | _ |
| GET | /{version}/admin/user/ | | { id } | | _ | _ |
| PUT | /{version}/admin/user/ | { username, password, isAdmin } | { id } | | _ | _ |
| DELETE | /{version}/admin/user/ | | { id } | | _ | _ |

[get_test]: http://localhost:8000/
[get_init]: http://localhost:8000/init
