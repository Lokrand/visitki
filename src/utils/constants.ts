const BASE_API_URL = "https://visitki.practicum-team.ru/api";

// Список эндпоинтов
export const USERS_URL = `${BASE_API_URL}/users`;
export const COMMENTS_URL = `${BASE_API_URL}/comments`;
export const PROFILES_URL = `${BASE_API_URL}/profiles`;

// Список маршрутов
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = `${HOME_ROUTE}login`;
//куратор может заходить на страницу любой когорты по адресу /cohort/{name} (COHORT_ROUTE) по ссылкам из админки.
export const COHORT_ROUTE = `${HOME_ROUTE}cohort/:name`;
// страница с детальной информацией о пользователе (которая с темами)
export const DETAIL_ROUTE = `${HOME_ROUTE}detail/:id`;
export const PROFILE_ROUTE = `${HOME_ROUTE}profile/:id`;
export const MAP_ROUTE = `${HOME_ROUTE}map`;
export const ADMIN_ROUTE = `${HOME_ROUTE}admin`;
export const ADMIN_USERS_ROUTE = `${ADMIN_ROUTE}/users`;

/*
    Оставляю поясния к эндпойнтам, что удалось узнать. Прошу после выполнения всех запросов на сервер, не забыть удалить данное пояснение
    /users
        -> POST (создать нового пользователя) 
            -> Body {
                        "email": "SDTXnXVBfc@dqthFuqtktIbKnboAMveXtKfwPwUEx.dx",
                        "cohort": "web+123"
                    }
            -> Res  {
                        "_id": "abfccdaa23e0bd1c4448d2f3",
                        "createdAt": 1669856400806,
                        "updatedAt": null,
                        "email": "Chaim.Armstrong@gmail.com",
                        "cohort": "web+16",
                        "name": "Ricky Fadel"
                    }
        -> GET (получить всех пользователей)
            -> Есть query парамаетры
                    -> offset (Количество элементов, которые следует пропустить перед началом сбора результирующего набора.)
                    -> limit  (Количество возвращаемых товаров.)
                    -> search (Запрос для фильтрации результатов поиска.)
            -> Res 
                    {
                        "total": 2,
                        "items": [
                            {
                                "_id": "abfccdaa23e0bd1c4448d2f3",
                                "createdAt": 1669856400806,
                                "updatedAt": null,
                                "email": "Chaim.Armstrong@gmail.com",
                                "cohort": "web+16",
                                "name": "Ricky Fadel"
                            },
                            ...
                        ]
                    }
    /users/:id (обязательный индификатор пользователя) 
        -> PUT - походу для внесения измения в данные о пользователе
            -> Body {
                        "email": "SDTXnXVBfc@dqthFuqtktIbKnboAMveXtKfwPwUEx.dx",
                        "cohort": "web+123"
                    }
            -> Res  {
                        "_id": "abfccdaa23e0bd1c4448d2f3",
                        "createdAt": 1669856400806,
                        "updatedAt": null,
                        "email": "Chaim.Armstrong@gmail.com",
                        "cohort": "web+16",
                        "name": "Ricky Fadel"
                    }
    /comments
         -> GET (получить всех пользователей)
            -> Есть query парамаетры
                    -> offset (Количество элементов, которые следует пропустить перед началом сбора результирующего набора.)
                    -> limit  (Количество возвращаемых товаров.)
                    -> search (Запрос для фильтрации результатов поиска.)
            -> Res
                    {
                        "total": 5,
                        "items": [
                            {
                                "_id": "c824a2de0b675b0acb5a2923",
                                "from": {
                                    "_id": "e638ad9bce6d7efd1b5b035b",
                                    "name": "Elvira Grady",
                                    "email": "Anita93@hotmail.com"
                                },
                                "target": "hobby",
                                "text": "Laborum omnis harum modi omnis architecto ipsam adipisci dolore.",
                                "to": {
                                    "_id": "abfccdaa23e0bd1c4448d2f3",
                                    "name": "Ricky Fadel",
                                    "email": "Chaim.Armstrong@gmail.com"
                                }
                            },
                            ...
                        ]
                    }
    /comments/:id ((Обязательно) значение идентификатора реакции из user.reactions[]._id)
        -> DEL (удаление коментария)
        -> Res (пустой ответ, в случае ошибки, придет поле "error": "сообщение ошибки")
    /profiles
        -> GET (получение всех профилей пользователей)
            -> Есть query парамаетры
                -> offset (Количество элементов, которые следует пропустить перед началом сбора результирующего набора.)
                -> limit  (Количество возвращаемых товаров.)
                -> cohort (номер когорты для фильтров профилей для куратора)
        -> Res
            {
                "total": 2,
                "items": [
                    {
                        "_id": "abfccdaa23e0bd1c4448d2f3",
                        "createdAt": 1669856400806,
                        "updatedAt": null,
                        "email": "Chaim.Armstrong@gmail.com",
                        "cohort": "web+16",
                        "profile": {
                            "name": "Ricky Fadel",
                            "photo": "https://loremflickr.com/640/480/cats",
                            "city": {
                                "name": "Berylfurt",
                                "geocode": [
                                    "55.1730",
                                    "37.9869"
                                ]
                            }
                        }
                    },
                    ...
                ]
            }
    /profiles/:id ((обязательно) идентификатор пользователя)
        -> GET (получение всей информации о пользователе по id)
        -> RES 
            {
                "_id": "e638ad9bce6d7efd1b5b035b",
                "createdAt": 1670695121880,
                "updatedAt": null,
                "email": "Anita93@hotmail.com",
                "cohort": "web+16",
                "profile": {
                    "name": "Elvira Grady",
                    "photo": "https://loremflickr.com/640/480/cats",
                    "city": {
                        "name": "South Aracely",
                        "geocode": [
                            "55.7256",
                            "37.9951"
                        ]
                    },
                    "birthday": "Wed Apr 03",
                    "quote": "",
                    "telegram": "Ericka54",
                    "github": "Blaze.Upton13",
                    "template": null
                },
                "info": {
                    "hobby": {
                        "text": "Facilis laborum sunt eum occaecati asperiores dignissimos adipisci qui sed.\nMinus quaerat necessitatibus incidunt.\nSunt deserunt explicabo.\nLabore facilis maxime ullam exercitationem assumenda.\nPorro iste rem eaque laboriosam aliquam perferendis praesentium nesciunt.",
                        "image": "https://loremflickr.com/640/480/cats",
                        "reactions": 29
                    },
                    "status": {
                        "text": "Possimus ea molestiae nihil tenetur.\nAtque ipsum tempora aut qui veniam ipsam non delectus possimus.\nOptio quis et similique alias asperiores.\nLabore asperiores delectus repudiandae.\nAtque similique vero temporibus accusantium sit ea nisi quis.",
                        "image": "https://loremflickr.com/640/480/cats",
                        "reactions": 98
                    },
                    "job": {
                        "text": "Fuga doloremque tempora modi possimus consequatur.\nNumquam cupiditate libero tempore.\nNumquam saepe dolorum a ex eligendi laborum nihil quasi sequi.\nDolorem repellat quidem excepturi modi suscipit tenetur quasi.\nFacere temporibus fugit error commodi reiciendis exercitationem.",
                        "image": "https://loremflickr.com/640/480/cats",
                        "reactions": 33
                    },
                    "edu": {
                        "text": "Magni accusamus cupiditate cupiditate laudantium.\nDeserunt exercitationem nobis eveniet quod repellendus.\nVoluptatum atque ipsum eligendi dolorum.\nLaboriosam quo quae ea asperiores dicta.\nIure optio repudiandae error quod expedita pariatur doloremque.",
                        "image": "https://loremflickr.com/640/480/cats",
                        "reactions": 75
                    }
                },
                "reactions": 0
            }
        -> PATH (обновление данных пользователя)
            -> body 
                {
                    "profile": {
                        "name": "УУУ",
                        "photo": "https://placehold.co/600",
                        "city": {
                        "name": "������, ������",
                        "geocode": [
                            55.73433517114847,
                            37.59017466910319
                        ]
                        },
                        "birthday": "2012-04-19",
                        "quote": "nulla occaecat",
                        "telegram": "deserunt ullamco",
                        "github": "dolor occaecat si",
                        "template": "Lorem aliqua veniam Duis adipisicing"
                    },
                    "info": {
                        "hobby": {
                        "text": "",
                        "image": null
                        },
                        "status": {
                        "text": "",
                        "image": null
                        },
                        "job": {
                        "text": "",
                        "image": null
                        },
                        "edu": {
                        "text": "",
                        "image": null
                        }
                    }
                }
            -> Res 
                {
                    "_id": "abfccdaa23e0bd1c4448d2f3",
                    "createdAt": 1669856400806,
                    "updatedAt": null,
                    "email": "Chaim.Armstrong@gmail.com",
                    "cohort": "web+16",
                    "profile": {
                        "name": "Ricky Fadel",
                        "photo": "https://loremflickr.com/640/480/cats",
                        "city": {
                            "name": "Berylfurt",
                            "geocode": [
                                "55.1730",
                                "37.9869"
                            ]
                        },
                        "birthday": "Fri May 31",
                        "quote": "",
                        "telegram": "Jorge2",
                        "github": "Isaias_Nitzsche13",
                        "template": null
                    },
                    "info": {
                        "hobby": {
                            "text": "Quidem iusto laborum veritatis debitis perspiciatis tempore quaerat molestiae accusantium.\nNemo harum accusamus tenetur temporibus vitae exercitationem nesciunt soluta.\nPariatur iure optio repellendus esse veritatis.\nEius saepe veniam velit ipsam modi fuga minus nulla amet.\nDucimus repellendus atque.",
                            "image": "https://loremflickr.com/640/480/cats",
                            "reactions": 52
                        },
                        "status": {
                            "text": "Pariatur adipisci blanditiis esse.\nSaepe in molestiae modi earum molestias in fugit repellat.\nQuod aperiam minima nisi hic quibusdam quaerat.\nAsperiores vitae molestias facere cupiditate consectetur iure.\nIpsum omnis delectus.",
                            "image": "https://loremflickr.com/640/480/cats",
                            "reactions": 59
                        },
                        "job": {
                            "text": "Laborum autem reiciendis voluptatum facere odio ex atque deleniti.\nEnim alias at molestiae molestias doloribus numquam laudantium.\nUt autem placeat.\nAccusamus error nam reprehenderit iure facere.\nCommodi repudiandae odio fugit quis quis deleniti rerum similique facilis.",
                            "image": "https://loremflickr.com/640/480/cats",
                            "reactions": 51
                        },
                        "edu": {
                            "text": "Debitis vitae est esse.\nReiciendis alias ex.\nDolorem sed suscipit voluptates.\nExplicabo neque occaecati autem corporis repellendus nulla.\nMollitia ad suscipit dicta deleniti natus.",
                            "image": "https://loremflickr.com/640/480/cats",
                            "reactions": 73
                        }
                    },
                    "reactions": 8
                }
    /profiles/:id/reactions (id нужно указывать параметром, обязательно)
        -> GET  (получение всех реакции определеного пользователя)
            -> Есть query парамаетры
                -> offset (Количество элементов, которые следует пропустить перед началом сбора результирующего набора.)
                -> limit  (Количество возвращаемых товаров.)
        -> Res
            {
                "total": 8,
                "items": [
                    {
                        "_id": "c824a2de0b675b0acb5a2923",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": "hobby",
                        "text": "Laborum omnis harum modi omnis architecto ipsam adipisci dolore."
                    },
                    {
                        "_id": "bad224dbc4a601caff7e0b2c",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": "edu",
                        "text": "Soluta consectetur tempore eaque modi sequi autem ducimus."
                    },
                    {
                        "_id": "c2f15f9b4315bb20aebf9a1d",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": "status",
                        "text": "Eveniet excepturi commodi eaque dignissimos quae nesciunt nam dolorum."
                    },
                    {
                        "_id": "38eb4bbe3da2fcf2d4cfcd59",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": "job",
                        "text": "Accusantium neque minus tempora."
                    },
                    {
                        "_id": "0ebcdb97d72b2b17345c30c8",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": null,
                        "text": "Libero ad tempora exercitationem numquam adipisci quibusdam doloremque incidunt."
                    },
                    {
                        "_id": "71d2cb1e9e2fdedb9ad435ac",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": null,
                        "emotion": "like"
                    },
                    {
                        "_id": "28b1a7432df6dcf73ac9d45f",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": null,
                        "emotion": "smile"
                    },
                    {
                        "_id": "3ebe958d84bd8de740abdaab",
                        "from": {
                            "_id": "e638ad9bce6d7efd1b5b035b",
                            "name": "Elvira Grady",
                            "email": "Anita93@hotmail.com"
                        },
                        "target": null,
                        "emotion": "heart"
                    }
                ]
            }
    -> POST (создать новую реакцию)
        -> body 
            {
                "target": "job",
                "text": "id qui nisi elit"
            }
        -> res пустой ответ, в случае ошибки, выкинет ее
            
 */
