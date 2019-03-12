const renderHtml = (body) =>
	`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charSet="utf-8"/>
		<meta http-equiv="x-ua-compatible" content="ie=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	</head>
<body>
${body}
<!-- generated ${new Date().toISOString()} -->
</body>
</html>`;

module.exports = {
	renderHtml
};
