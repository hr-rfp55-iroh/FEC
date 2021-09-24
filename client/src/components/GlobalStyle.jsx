import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 32px;
  width: auto;
  height: 100%;

  ${(props) =>
    props.fluid &&
    css`
      padding: 0;
      margin: 0;
      max-width: 100%;
    `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `};
  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
`;

export const Banner = styled.div`
  background-image: ${(props) => props.theme.bannerBackgroundImage}
`;

export const Page = styled.div`
  background-image: ${(props) => props.theme.pageBackgroundImage};
  box-shadow: ${(props) => props.theme.pageBoxShadow};
  color: ${(props) => props.theme.text};
`;

export const PoInfoPnl = styled.div`
  background-color: ${(props) => props.theme.backgroundPOInfoPnl};
  width: 30%;
  text-align: left;
  margin: 30px 0px;
  padding: 2% 0%;
  display: flex;
  flex-direction: column;
`;

export const PoOverviewPnl = styled.div`
  background-image: ${(props) => props.theme.poTextBackgroundImage};
  font-style: italic;
  font-weight: 300;
  width: 100%;
  text-align: center;
  height: fit-content;
  margin-right: 5%;
  padding: 1%;
`;

export const Tile = styled.div`
  background-color: ${(props) => props.theme.backgroundPOInfoPnl};
`;

export const SwitchButton = styled.label`
  width: 100%;
  height: 50px;

  input {
    opacity: 1;
    width: 50px;
    height: 50px;
  }

  span {
    cursor: pointer;
    background-color: ${(props) => props.theme.background};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    content: 'Hello';
    height: 50px;
    width: 50px;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${(props) => props.theme.background};
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Heading = styled.div`
  font-size: 5em;
  font-weight: 800;
  color: ${(props) => props.theme.text};
`;
