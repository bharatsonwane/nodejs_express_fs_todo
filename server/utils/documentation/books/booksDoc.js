
// // swagger defination
exports.bookDefination = {
    "loginUser": {
        "type": "object",
        "properties": {
            "email": {
                "type": "string"
            },
            "password": {
                "type": "string"
            },
            "token": {
                "type": "string"
            },
            "deviceType": {
                "type": "string",
                "enum": ["android", "ios"]
            },
            "deviceUId": {
                "type": "string"
            }
        }
    },
    "loginAdmin": {
        "type": "object",
        "properties": {
            "email": {
                "type": "string"
            },
            "password": {
                "type": "string"
            }
        }
    },
    "user": {
        "type": "object",
        "properties": {
            "email": {
                "type": "string"
            },
            "uId": {
                "type": "string"
            },
            "foreName": {
                "type": "string"
            },
            "sureName": {
                "type": "string"
            },
            "phoneNumber": {
                "type": "number"
            },
            "isAdmin": {
                "type": "boolean"
            }
        }
    },
    "files": {
        "type": "object",
        "properties": {}
    }
}



//  // swagger paths
module.exports = {

    "/users/token": {
        "post": {
            "tags": ["users"],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "schema": {
                        "$ref": "#/definitions/loginUser"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/users/admin/token": {
        "post": {
            "tags": ["admin"],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "schema": {
                        "$ref": "#/definitions/loginAdmin"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/users": {
        "get": {
            "tags": ["users"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                }
            }
        },
        "post": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string"
                        },
                        "password": {
                            "type": "string"
                        },
                        "foreName": {
                            "type": "string"
                        },
                        "sureName": {
                            "type": "string"
                        },
                        "phoneNumber": {
                            "type": "number"
                        },
                        "isAdmin": {
                            "type": "boolean"
                        }
                    }
                }
            ],
            "responses": {
                "201": {
                    "description": "Created!"
                }
            }
        },
        "patch": {
            "tags": ["users"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "foreName": {
                            "type": "string"
                        },
                        "sureName": {
                            "type": "string"
                        },
                        "phoneNumber": {
                            "type": "number"
                        }
                    }
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        }
    },
    "/users/filter": {
        "get": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "query",
                    "type": "string"
                },
                {
                    "name": "orderby",
                    "in": "query",
                    "required": true,
                    "type": "string",
                    "enum": ["uId", "email", "foreName"]
                },
                {
                    "name": "order",
                    "in": "query",
                    "required": true,
                    "type": "string",
                    "enum": ["desc", "asc"]
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                }
            }
        }
    },
    "/users/{uid}": {
        "get": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "uid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                }
            }
        },
        "delete": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "uid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        },
        "patch": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "uid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                },
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "foreName": {
                            "type": "string"
                        },
                        "sureName": {
                            "type": "string"
                        },
                        "phoneNumber": {
                            "type": "number"
                        }
                    }
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        }
    },
    "users/{uid}/activate": {
        "put": {
            "tags": ["admin"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "uid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        }
    },
    "/users/forgetpassword": {
        "post": {
            "tags": ["users"],
            "parameters": [
                {
                    "in": "body",
                    "required": false,
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string"
                        }
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "ok"
                }
            }
        }
    },
    "/users/confirmpassword": {
        "put": {
            "tags": ["users"],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "oobCode": {
                            "type": "string"
                        },
                        "password": {
                            "type": "string"
                        }
                    }
                }
            ],

            "responses": {
                "200": {
                    "description": "OK"
                }
            }
        }
    },
    "/files": {
        "get": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/files/all": {
        "get": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/files/upload/{emailid}": {
        "post": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "emailid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "filename",
                    "in": "query",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "foldername",
                    "in": "query",
                    "type": "string",
                    "required": true
                },
                {
                    "in": "formData",
                    "required": true,
                    "type": "file",
                    "Content-Type": "multipart/form-data",
                    "description": "The file to upload."
                }
            ],
            "responses": {
                "201": {
                    "description": "created!"
                }
            }
        }
    },
    "/files/sharedwith/{emailid}": {
        "get": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "emailid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/files/{fileid}/download": {
        "get": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "fileid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/files/{fileid}/unshare/{emailid}": {
        "post": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "fileid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "emailid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/files/folder/{foldername}/unshare/{emailid}": {
        "post": {
            "tags": ["files"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "foldername",
                    "in": "path",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "emailid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },

    "/notifications": {
        "get": {
            "tags": ["notification"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/notifications/users/{uid}": {
        "post": {
            "tags": ["notification"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "uid",
                    "in": "path",
                    "required": true,
                    "type": "string"
                },
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/notifications/all": {
        "post": {
            "tags": ["notification"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Success!"
                }
            }
        }
    },
    "/notifications/users/seen": {
        "put": {
            "tags": ["notification"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "query",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        }
    },
    "/notifications/users/delete": {
        "delete": {
            "tags": ["notification"],
            "security": [
                {
                    "JWT": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "query",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "204": {
                    "description": "No content"
                }
            }
        }
    }
}