const user = {
    "id": 1,
    "email": "alex@email.com",
    "username": "Alex79",
    "first_name": null,
    "last_name": null,
    "phone_number": null,
    "car": [
        {
            "id": 1,
            "car_brand": "bmw",
            "car_model": "e36",
            "car_spec": "street",
            "car_category": "timeattack",
            "carSpec": {
                "id": 1,
                "car_id": 1,
                "car_engine": "m52b28",
                "car_tires": "greeva",
                "car_suspension": "bc",
                "car_differential": "2way",
                "car_aero": "msport"
            }
        },
        {
            "id": 2,
            "car_brand": "nissan",
            "car_model": "200sx",
            "car_spec": "tracktool",
            "car_category": "drifting",
            "carSpec": {
                "id": 2,
                "car_id": 2,
                "car_engine": "sr20",
                "car_tires": "greeva",
                "car_suspension": "bc",
                "car_differential": "2way",
                "car_aero": "origin"
            }
        }
    ],
    "inscription": [
        {
            "id": 1,
            "car_id": 1,
            "event_id": 1,
            "price": "200eu",
            "event": {
                "id": 1,
                "event_image": null,
                "event_name": "1SB",
                "event_status": "open",
                "start_date": "2024-05-10",
                "finish_date": "2024-05-12",
                "event_car_spec": "street",
                "event_category": "drifting"
            }
        },
        {
            "id": 2,
            "car_id": 1,
            "event_id": 2,
            "price": "200eu",
            "event": {
                "id": 2,
                "event_image": null,
                "event_name": "2SB",
                "event_status": "open",
                "start_date": "2024-10-10",
                "finish_date": "2024-10-12",
                "event_car_spec": "street",
                "event_category": "drifting"
            }
        }
    ]
}

console.table(user.car)
