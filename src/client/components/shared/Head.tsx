import Html from "@kitajs/html";

interface IheadProps {}

export const Head = (props: IheadProps) => (
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="/public/scripts/main.js" />
    <link rel="stylesheet" href="/public/styles/main.css" />
    {/* <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" /> */}
    <title>Chuffeurs</title>
  </head>
);
