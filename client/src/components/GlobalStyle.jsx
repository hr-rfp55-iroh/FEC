import styled, { css } from 'styled-components';

export const Banner = styled.div`
  background-image: ${(props) => props.theme.bannerBackgroundImage}
`;

export const Page = styled.div`
  background-image: ${(props) => props.theme.pageBackgroundImage};
  color: ${(props) => props.theme.text};
  height: 100%;
`;

export const PoInfoPnl = styled.div`
  background-color: ${(props) => props.theme.backgroundPOInfoPnl};
  width: 30%;
  text-align: left;
  margin: 30px 0px;
  padding: 2% 0%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px grey;
  border-radius: 5px;
`;

export const PoOverviewPnl = styled.div`
  background-image: ${(props) => props.theme.poTextBackgroundImage};
  font-style: italic;
  font-weight: 300;
  width: 100%;
  text-align: center;
  height: fit-content;
  margin-right: 5%;
  padding: 3%;
  line-height: 1.5em;
`;

export const RatingPnl = styled.div`
  background-image: ${(props) => props.theme.starRatingBackground};
`;

export const Tile = styled.div`
  background-color: ${(props) => props.theme.backgroundPOInfoPnl};
`;

export const QuestionHeader = styled.div`
  background-color: ${(props) => props.theme.questionHeaderBackground};
`;

export const SwitchButton = styled.label`
  position: absolute;
  top: 200px;
  left: 95%;
  width: 60px;
  height: 34px;
  span {
    background-color: ${(props) => props.theme.backgroundSlider};
  }
  }
  input:checked + span {
    background-color: ${(props) => props.theme.backgroundSlider};
  }
`;
