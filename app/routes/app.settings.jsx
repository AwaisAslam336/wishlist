import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  let settings = { name: "Wishlist", description: "A wishlist app" };
  return json(settings);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData, "form data");
  let settings = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  return json(settings);
};

export default function SettingsPage() {
  const settings = useLoaderData();
  const [appInfo, setAppInfo] = useState(settings);
  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App Name"
                  name="name"
                  value={appInfo.name}
                  onChange={(value) => setAppInfo({ ...appInfo, name: value })}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={appInfo.description}
                  onChange={(value) =>
                    setAppInfo({ ...appInfo, description: value })
                  }
                />
                <Button variant="primary" submit={true}>
                  Update
                </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
