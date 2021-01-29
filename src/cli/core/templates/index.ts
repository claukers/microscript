// noinspection SpellCheckingInspection

export const logEnvFile = `####################
## logging
LOG_LEVEL=info
LOG_LEVEL_Database=error
#LOG_FILE=./logs/dev.log
`;

export const featuresEnvFile = `####################
## features
FEATURE_TOGGLE_DISABLE_POWERED=true
FEATURE_TOGGLE_REQUEST_UUID=true
FEATURE_TOGGLE_MORGAN=true
FEATURE_TOGGLE_BODY_PARSER=true
FEATURE_TOGGLE_BODY_PARSER_URL_ENCODED=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
`;

export const dbEnvFile = `####################
## db
DB_NAME=devdb
DB_HOST=localhost
DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
DB_PASS=
DB_DIALECT=sqlite
DB_DIALECT_SSL=true
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
`;

export const expressEnvFile = `####################
## express
PORT=8080
HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## body-parser
BODY_PARSER_INFLATE=true
BODY_PARSER_LIMIT=100kb
BODY_PARSER_STRICT=true
BODY_PARSER_TYPE=application/json
BODY_PARSER_URL_ENCODED_INFLATE=true
BODY_PARSER_URL_ENCODED_LIMIT=100kb
BODY_PARSER_URL_ENCODED_EXTENDED=true
BODY_PARSER_URL_ENCODED_TYPE=application/x-www-form-urlencoded
`;

export const authEnvFile = `####################
## Auth
TOKEN_LOCATION=header
#TOKEN_LOCATION=query
TOKEN_VERIFY_LOCATION=header
#TOKEN_VERIFY_LOCATION=query
TOKEN_HEADER=Authorization
#TOKEN_QUERY=Authorization
#TOKEN_VERIFY_ENDPOINT=
TOKEN_VERIFY_ENDPOINT_METHOD=GET
`;

// noinspection SpellCheckingInspection
export const templates = {
  logEnvFile,
  authEnvFile,
  dbEnvFile,
  expressEnvFile,
  featuresEnvFile
};
