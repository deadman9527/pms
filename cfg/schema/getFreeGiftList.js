cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":true,
                "properties":{
                    "data": {
                        "type":"array",
                        "required":true,
                        "items":
                        {
                            "type":"object",
                            "required":true,
                            "properties":{
                                "id": {
                                    "type":"string",
                                    "required":true
                                },
                                "name": {
                                    "type":"string",
                                    "required":true
                                }
                            }
                        }
                    },
                    "total_pages": {
                        "type":"number",
                        "required":false
                    },
                    "total": {
                        "type":"string",
                        "required":false
                    },
                    "page": {
                        "type":"number",
                        "required":false
                    },
                    "pagesize": {
                        "type":"number",
                        "required":false
                    },
                    "responseInfo": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "reasons": {
                                "type":"object",
                                "required":true,
                                "properties":{
                                    "code": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "msg": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "type": {
                                        "type":"number",
                                        "required":true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "statusCode": {
                "type":"number",
                "required":true
            }
        }
    }
);
