cobra.add({
    "type":"object",
    "required":true,
    "properties":{
        "responseBody": {
            "type":"object",
            "required":true,
            "properties":{
                "data": {
                    "type":"object",
                    "required":false,
                    "properties":{
                        "brands": {
                            "type":"string",
                            "required":false
                        },
                        "is_capital": {
                            "type":"number",
                            "required":false
                        },
                        "name": {
                            "type":"string",
                            "required":false
                        },
                        "capital": {
                            "type":"number",
                            "required":false
                        },
                        "waitForShipNum": {
                            "type":"number",
                            "required":false
                        }
                    }
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
});
