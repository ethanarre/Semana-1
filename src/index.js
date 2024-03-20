import express from "express"
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join, dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', (req, res) => {
    res.render("index");
});

    //res.json({"message":"Hola mundo"})

app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () =>
    console.log('cargando el puerto', app.get('port'))
);