import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from "aws-lambda";
import mysql from "promise-mysql";
import { dbConnection } from "./dbConfigure";

// pingハンドラー
export async function pingHandler(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext): Promise<APIGatewayProxyResult> {
  
  const connection = await mysql.createConnection({
    host: dbConnection.host,
    port: dbConnection.port,
    user: dbConnection.user,
    password: dbConnection.password,
    database: dbConnection.database
  });

  let sql = `SELECT * FROM データベース名 ;`;

  let result;
  try{
    result = await connection.query(sql);
  }catch(e){
    throw e;
  };

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    },
    body: JSON.stringify(result)
  }
  return response;
}
