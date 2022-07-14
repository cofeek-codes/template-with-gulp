const program = require('commander')
const fs = require('fs')

program.name('generate').argument('type').argument('name').parse()
function renderHtml(name) {
	var type

	if (/^[H|h]eader$/.test(name)) {
		type = 'header'
	} else if (/^[F|f]ooter$/.test(name)) {
		type = 'footer'
	} else if (/^[M|m]ain$/.test(name)) {
		type = 'main'
	} else {
		type = 'div'
	}
	var content = `
    <${type} class="${name}" id="${name}">
        <div class="${name}__wrapper">

        </div>
    </${type}>
    `
	return content
}
function renderCss(name) {
	var content = `
    .${name} {
        &__wrapper {

        }
    }
    `

	return content
}

function createHtml(name) {
	var content = renderHtml(name)
	if (/^([H|h]eader)|([F|f]ooter)|([M|m]ain)$/.test(name)) {
		fs.writeFile(`src/html/components/${name}.html`, content, e => e)
	} else {
		if (!fs.existsSync('src/html/components/blocks')) {
			fs.mkdirSync('src/html/components/blocks')
		}
		fs.writeFile(`src/html/components/blocks/${name}.html`, content, e => e)
	}
	console.log(`created: src/html/${name}.html`)
	if (fs.existsSync('src/html/components/main.html')) {
		console.log('updated: src/html/components/main.html')
	}
}
function createCss(name) {
	var content = renderCss(name)
	fs.writeFile(`src/style/_${name}.scss`, content, e => e)
	console.log(`created: src/style/_${name}.scss`)
	console.log(`updated: src/style/_main.scss`)
}
function includeStyle(name) {
	if (
		!fs.existsSync('src') ||
		!fs.existsSync('src/style') ||
		!fs.existsSync('src/style/_main.scss')
	) {
		console.log('create a skeleton struct first')
	} else {
		fs.appendFile('src/style/_main.scss', `@import "_${name}";\n`, e => e)
	}
}
function includeHtml(name) {
	if (
		!fs.existsSync('src') ||
		!fs.existsSync('src/html') ||
		!fs.existsSync('src/html/components')
	) {
		if (!fs.existsSync('src/html/components/main.html')) {
			console.log('you need a "main.html" to gulp include blocks in')
		}
		console.log(`block ${name} created but not included`)
	} else {
		fs.appendFile(
			'src/html/components/main.html',
			`@@include("blocks/${name}.html")\n`,
			e => e
		)
	}
}
function generate() {
	var type = program.args[0]
	var name = program.args[1]
	if (
		(type === 'html' &&
			(fs.existsSync(`src/html/${name}.html`) ||
				fs.existsSync(`src/html/components/${name}.html`) ||
				fs.existsSync(`src/html/components/blocks/${name}.html`))) ||
		(type === 'style' && fs.existsSync(`src/style/_${name}.scss`))
	) {
		console.log('you already have this component')
		process.exit(1)
	}
	if (type === 'html') {
		if (!fs.existsSync('src')) {
			fs.mkdirSync('src')
		}
		if (!fs.existsSync('src/html')) fs.mkdirSync('src/html')

		createHtml(name)
		if (!/^([H|h]eader)|([F|f]ooter)|([M|m]ain)$/.test(name)) {
			includeHtml(name)
		}
	} else if (type === 'style') {
		if (!fs.existsSync('src')) {
			fs.mkdirSync('src')
		}
		if (!fs.existsSync('src/style')) fs.mkdirSync('src/style')

		createCss(name)
		if (!fs.existsSync('src/style/_main.scss'))
			fs.writeFileSync('src/style/_main.scss', '')

		includeStyle(name)
	} else {
		console.log('Unknown type! types: html | style ')
	}
}
process.chdir(process.cwd())
generate()
