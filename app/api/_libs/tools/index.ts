import { tools, type Tools } from '@/_libs';
import { Bcrypt } from '@/api/_libs/tools/bcrypt';
import { Jwt } from '@/api/_libs/tools/jwt';

interface ServerTools extends Tools {
  bcrypt?: Bcrypt;
  jwt?: Jwt;
}

const serverTools: ServerTools = { ...tools, };

serverTools.bcrypt = new Bcrypt();
serverTools.jwt = new Jwt();

export { serverTools };
