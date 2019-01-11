/**
 * client config
 */
module.exports = {
  host: process.env.HOST || '127.0.0.1',
  port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000),
  apiHost:process.env.APIHOST || '127.0.0.1',
  apiPort:process.env.APIPORT || '3003',
  app:{
    title:"personal blog",
    description:'scs personal blog',
    head:{
        titleTemplate:'blog',
        meta:[
            {
                name:"description",
                content:"react express blog"
            },
            {charset:"utf-8"}
        ]
    }
}
}
