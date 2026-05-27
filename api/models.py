from django.db import models


class Farmer(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CropUpload(models.Model):
    farmer_name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=20, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    village = models.CharField(max_length=100, default="")

    crop_name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    price = models.IntegerField()
    status = models.CharField(max_length=50, default="Available")

    def __str__(self):
        return self.crop_name


class MarketPrice(models.Model):
    crop = models.CharField(max_length=100)
    price = models.IntegerField()
    unit = models.CharField(max_length=50)
    trend = models.CharField(max_length=50)

    def __str__(self):
        return self.crop


class GovernmentScheme(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.title

