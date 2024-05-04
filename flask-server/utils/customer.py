from wtforms import Form, validators, StringField, FloatField, IntegerField, DateField, SelectField


class AddCustomer(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    email = StringField('Email', [validators.length(min=6, max=50)])
