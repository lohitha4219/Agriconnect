from rest_framework import serializers
from .models import Farmer, CropUpload, MarketPrice, GovernmentScheme


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = "__all__"


class CropUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropUpload
        fields = "__all__"


class MarketPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPrice
        fields = "__all__"


class GovernmentSchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentScheme
        fields = "__all__"


