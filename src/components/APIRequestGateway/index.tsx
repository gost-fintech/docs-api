import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock"

const APIRequestGateway = ({endpoint}: { endpoint: string }): JSX.Element => {
    return (
        <CodeBlock>
            POST: {process.env.PAYMENT_API_GATEWAY}{endpoint}
        </CodeBlock>
    )
}

export default APIRequestGateway;