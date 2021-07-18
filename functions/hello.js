exports.handler = async function(event, context){
  return{
    statusCode: 200,
    body: JSON.stringify({
      name:'jaeilit',
      age: 85,
      email : 'email@naver.com'
    })
  }
}
