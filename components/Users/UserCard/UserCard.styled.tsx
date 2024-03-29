import styled from '@emotion/styled'


export const RowWrap = styled('div')`
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    background-color: var(--card-color);
    padding:  16px;
`;

export const UsersTable = styled('div')`
    display: none;
    @media screen and (min-width: 768px) {
        display: grid;
        gap: 20px;

    }
`;

export const Cell = styled('div')`
    overflow: hidden;

`;