import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useState } from "react";
import FullPageSections from "./FullPageSections";
export default function CartApp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FullPageSections />
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm" style={{display: 'none'}}>
            Open Drawer
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
