import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import { setMeta } from '@/_libs';
import 'swagger-ui-react/swagger-ui.css';

interface Props {}

export const metadata = setMeta({
  title: `API 문서`,
  url: `/docs`,
});

export default function page() {
  return (
    <SwaggerUI url='/swagger/swagger.json' />
  );
}
