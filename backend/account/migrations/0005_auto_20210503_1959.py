# Generated by Django 2.1.5 on 2021-05-03 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_account_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]