import { Button, Container as ContainerMui, Box } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { ScrolleableBox } from "../../components/ScrolleableBox";
import { ChatNavigation } from "./../chat/ChatNavigation";

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 30px;
`;
const Panel = styled(ScrolleableBox)`
  border-radius: 15px;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 90vh;
  position: sticky;
  top: 0;
  margin: auto 0;
`;

const NavigationPanel = styled(Panel)`
  padding: 0px;
  padding-right: var(--spacing-2);
`;
export function MainLayout() {
  return (
    <ContainerMui maxWidth="lg">
      <Grid>
        <NavigationPanel>
          <ChatNavigation />
        </NavigationPanel>
        <Panel>
          <Outlet />
        </Panel>
      </Grid>
    </ContainerMui>
  );
}
