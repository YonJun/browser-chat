import styled from "styled-components";
export const ScrolleableBox = styled.div`
  &::-webkit-scrollbar {
    width: var(--spacing);
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: none;
    border-radius: 10px;
    transition: all 0.5s ease;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #e6e6e6;
  }
  & {
    overflow-y: scroll;
  }
`;
