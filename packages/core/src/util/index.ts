import { Context, APIGatewayProxyEvent } from "aws-lambda";

export module Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: Number;

      try {
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        console.error(error);
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }

      return {
        body,
        statusCode,
      };
    };
  }
}