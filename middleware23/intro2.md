const requestLogger = (request, response, next) => {
    console.log(`${request.method} url:: ${request.url}`);
    next();
}

app.use(requestLogger)                                              <requestLogger = application middleware>
---------------------------------------------------------------------
app.use('/auth', authRouter);
authRouter.use(function validate33(req, res, next) {                <validate33 = route-level middleware>
    if(req.body.email && req.body.password) { next() }
    else res.send('auth failed');
});
---------------------------------------------------------------------