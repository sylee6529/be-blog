import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"
import { tokens } from "src/styles"

const Profile: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="avatar">
        <Image
          className="avatar-img"
          src={CONFIG.profile.image}
          alt={CONFIG.profile.name}
          width={92}
          height={92}
        />
      </div>
      <div className="name">{CONFIG.profile.name}</div>
      <div className="subtitle">{CONFIG.profile.role}</div>
    </StyledWrapper>
  )
}

export default Profile

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  text-align: center;

  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    box-shadow: ${tokens.shadow.avatar};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-img {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    object-fit: cover;
  }
  .name {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${tokens.color.text};
  }
  .subtitle {
    font-size: 0.85rem;
    color: ${tokens.color.muted};
    margin-top: -4px;
  }
`
