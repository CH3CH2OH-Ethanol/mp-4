"use client";

import type {ReactNode} from "react";
import {styled} from "styled-components";

const Main = styled.main`
    flex: 1;
    padding: clamp(24px, 4vw, 48px);
    border-radius: 12px;
    background: rgb(25 26 28);
`;

const Header = styled.header`
    max-width: 760px;
    margin-bottom: 32px;
`;

const Eyebrow = styled.p`
    margin-bottom: 8px;
    color: rgb(195 102 56);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
`;

const Heading = styled.h1`
    margin-bottom: 12px;
    color: rgb(223 225 229);
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.08;
`;

const Description = styled.p`
    color: rgb(166 169 176);
    font-size: 1.05rem;
    line-height: 1.65;
`;

const Message = styled.div<{$tone: "normal" | "error"}>`
    padding: 18px 20px;
    border: 1px solid ${({$tone}) => $tone === "error" ? "rgb(170 75 75)" : "rgb(66 110 200)"};
    border-radius: 10px;
    background: ${({$tone}) => $tone === "error" ? "rgb(74 38 40)" : "rgb(37 46 69)"};
    color: rgb(223 225 229);
    line-height: 1.5;
`;

interface PageLayoutProps {
    eyebrow: string;
    title: string;
    description?: string;
    children: ReactNode;
}

function PageLayout({eyebrow, title, description, children}: PageLayoutProps) {
    return (
        <Main>
            <Header>
                <Eyebrow>{eyebrow}</Eyebrow>
                <Heading>{title}</Heading>
                {description && <Description>{description}</Description>}
            </Header>
            {children}
        </Main>
    );
}

export function StatusMessage({children, tone = "normal"}: {children: ReactNode, tone?: "normal" | "error"}) {
    return <Message $tone={tone} role={tone === "error" ? "alert" : "status"}>{children}</Message>;
}

export default PageLayout;
