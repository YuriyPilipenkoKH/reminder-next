import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid';


interface AvatarWrapProps {
    avatarurl: string;
    fileurl: string;
  }

export const AvatarWrap = styled("div", {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) && !["avatarurl", "fileurl"].includes(prop),
  })<AvatarWrapProps>(
    ({ avatarurl, fileurl }) => {
      return {
        height: '240px',
        width: '240px',
        borderRadius: '50%',
        border: '16px solid var(--background-color)',
        backgroundColor: 'var(--profile-background)',
        backgroundImage: fileurl ? `url(${fileurl})` : `url(${avatarurl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        left: '200px',
        top: '0px',
        transform: 'translate(-50%, -50%)'

      }
    }
  )


  