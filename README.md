# crud-api
CRUD API implementation using node JS

[Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Run in development mode
```
npm run start:dev
```

### Run in production mode
```
npm run start:prod
```
Transpiled code will be located in `dist` folder

### Postman collection for testing
```
{
	"info": {
		"_postman_id": "6ca6e097-79f5-48a7-8d8b-4cd355486b10",
		"name": "CRUD-API",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "create user",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\": \"u1\",\n    \"age\": 18,\n    \"hobbies\": [1,2,3,4]\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/api/users",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "get all users",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/api/users",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "get user by id",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/api/users/asdfasdfasdfasdf",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users",
						"asdfasdfasdfasdf"
					]
				}
			},
			"response": []
		},
		{
			"name": "update user by id",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\": \"u1\",\n    \"age\": 18,\n    \"hobbies\": [1,2,3,4]\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/api/users/",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "delete user by id",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:3000/api/users/003294b2-fdce-4878-9114-14a1d6a887c",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users",
						"003294b2-fdce-4878-9114-14a1d6a887c"
					]
				}
			},
			"response": []
		}
	]
}
```
