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
                                "end_time": {
                                    "type":"string",
                                    "required":true
                                },
                                "id": {
                                    "type":"string",
                                    "required":true
                                },
                                "ifTicket": {
                                    "type":"string",
                                    "required":true
                                },
                                "name": {
                                    "type":"string",
                                    "required":true
                                },
                                "priority": {
                                    "type":"string",
                                    "required":true
                                },
                                "rule": {
                                    "type":"string",
                                    "required":true
                                },
                                "start_time": {
                                    "type":"string",
                                    "required":true
                                },
                                "status": {
                                    "type":"string",
                                    "required":true
                                }
                            }
                        }


                    },
                    "page": {
                        "type":"number",
                        "required":true
                    },
                    "pagesize": {
                        "type":"number",
                        "required":true
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
                    },
                    "total_pages": {
                        "type":"number",
                        "required":true
                    },
                    "total": {
                        "type":"string",
                        "required":true
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
