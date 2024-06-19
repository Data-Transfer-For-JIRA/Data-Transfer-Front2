import { Box } from '@mui/material';
import { JIRATransformer  } from '@atlaskit/editor-jira-transformer';
import { JiraSchema as schema } from '@atlaskit/editor-common';
import { adfData } from '@common/DefaultValue';

export default function Test(){
  const transformer = new JIRATransformer(schema);
  const test = transformer.parse(JSON.stringify(adfData));
  console.log(test);
  return (
    <Box>
      hi
    </Box>
  )
}
