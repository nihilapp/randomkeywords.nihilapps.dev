'use client';

import React from 'react';
import {
  Accordion, AccordionItem, Card, CardContent, Separator
} from '@/app/_components';

interface Props {
  children?: React.ReactNode;
}

export function Home({ children, }: Props) {
  return (
    <Card>
      <CardContent>
        <Accordion>
          <AccordionItem trigger='Accordion Item #1' content='Accordion Item #1' />
          <AccordionItem trigger='Accordion Item #2' content='Accordion Item #2' />
          <AccordionItem trigger='Accordion Item #3' content='Accordion Item #3' />
        </Accordion>

        <Separator />
      </CardContent>
    </Card>
  );
}
