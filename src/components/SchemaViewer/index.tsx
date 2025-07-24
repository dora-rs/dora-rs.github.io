import React, { JSX } from "react";
import JSONSchemaViewer from "@theme/JSONSchemaViewer";
import Markdown from "react-markdown";

export default function SchemaViewer(): JSX.Element {
    const [schema, setSchema] = React.useState(
        undefined as undefined | Error | unknown,
    );

    React.useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/dora-rs/dora/refs/heads/main/libraries/core/dora-schema.json",
            {
                headers: {
                    Accept: "application/json",
                },
            },
        )
            .then((response) => response.json())
            .then((data) => setSchema(data))
            .catch((err) => setSchema(err));
    }, [schema]);

    return (
        <div>
            {schema === undefined && <div>Loading ...</div>}
            {schema !== undefined && schema instanceof Error && (
                <div>Error Loading JSON schema : {schema.message}</div>
            )}
            {schema !== undefined && !(schema instanceof Error) && (
                <JSONSchemaViewer
                    schema={schema}
                    viewerOptions={{
                        DescriptionComponent: ({ description }) => {
                            return <Markdown>{description}</Markdown>;
                        },
                    }}
                />
            )}
        </div>
    );
}
