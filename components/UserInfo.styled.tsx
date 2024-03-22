import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid';


interface AvatarWrapProps {
    avatarurl: string;
  }
export const AvatarWrap = styled("div", {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) && !["avatarurl"].includes(prop),
  })<AvatarWrapProps>(
    ({ avatarurl }) => {
      return {
        height: '240px',
        width: '240px',
        borderRadius: '50%',
        border: '16px solid var(--background-color)',
        backgroundColor: 'var(--profile-background)',
        backgroundImage: `url(${avatarurl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        left: '210px',
        top: '0px',
        transform: 'translate(-50%, -50%)'

      }
    }
  )

//   interface StyledIconProps {
//     as?: EmotionIcon
//     color: ThemeColor
//     size: IconSize
//     margin: string
//     padding: string
//   }

//   export const StyledIcon = styled("span", {
//     shouldForwardProp: (prop: string) =>
//       isPropValid(prop) && !["size", "as"].includes(prop),
//   })<StyledIconProps>(({ color, size, margin, padding, theme }) => {
//     return {
//       color: theme.colors[color],
//       fill: "currentColor",
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContents: "center",
//       fontSize: theme.iconSizes[size],
//       width: theme.iconSizes[size],
//       height: theme.iconSizes[size],
//       margin: computeSpacingStyle(margin, theme),
//       padding: computeSpacingStyle(padding, theme),
//       flexShrink: 0,
//     }
//   })
  