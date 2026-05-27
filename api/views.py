from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Farmer, CropUpload, MarketPrice, GovernmentScheme

from .serializers import (
    FarmerSerializer,
    CropUploadSerializer,
    MarketPriceSerializer,
    GovernmentSchemeSerializer,
)


@api_view(['POST'])
def farmer_signup(request):
    name = request.data.get("name", "").strip()
    mobile = request.data.get("mobile", "").strip()
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "").strip()

    if not name or not mobile or not email or not password:
        return Response({"message": "All fields are required"}, status=400)

    if Farmer.objects.filter(email=email).exists():
        return Response({"message": "Email already registered"}, status=400)

    farmer = Farmer.objects.create(
        name=name,
        mobile=mobile,
        email=email,
        password=password
    )

    return Response({
        "message": "Farmer registered successfully",
        "farmer": FarmerSerializer(farmer).data
    }, status=201)


@api_view(['POST'])
def farmer_login(request):
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "").strip()

    try:
        farmer = Farmer.objects.get(email=email)

        if str(farmer.password).strip() == password:
            return Response({
                "message": "Farmer login successful",
                "farmer": FarmerSerializer(farmer).data
            })

        return Response({"message": "Incorrect password"}, status=400)

    except Farmer.DoesNotExist:
        return Response({"message": "Account not found"}, status=400)


@api_view(['POST'])
def forgot_password(request):
    email = request.data.get("email", "").strip().lower()
    new_password = request.data.get("new_password", "").strip()

    if not email or not new_password:
        return Response({"message": "Email and new password are required"}, status=400)

    try:
        farmer = Farmer.objects.get(email=email)
        farmer.password = new_password
        farmer.save()

        return Response({"message": "Password reset successfully"})

    except Farmer.DoesNotExist:
        return Response({"message": "Account not found"}, status=400)


@api_view(['POST'])
def admin_login(request):
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "").strip()

    if email == "nslohitha2924@gmail.com" and password == "lohitha2924":
        return Response({"message": "Admin login successful"})

    return Response({"message": "Invalid admin credentials"}, status=400)


@api_view(['GET'])
def farmers_list(request):
    farmers = Farmer.objects.all().order_by("-id")
    serializer = FarmerSerializer(farmers, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_farmer(request, id):
    try:
        farmer = Farmer.objects.get(id=id)
        farmer.delete()
        return Response({"message": "Farmer deleted successfully"})

    except Farmer.DoesNotExist:
        return Response({"message": "Farmer not found"}, status=404)


@api_view(['GET'])
def crop_uploads(request):
    crops = CropUpload.objects.all().order_by("-id")
    serializer = CropUploadSerializer(crops, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def upload_crop(request):
    farmer_name = request.data.get("farmer_name", "").strip()
    crop_name = request.data.get("crop_name", "").strip()
    village = request.data.get("village", "").strip()
    quantity = request.data.get("quantity", "")
    price = request.data.get("price", "")

    if not farmer_name or not crop_name or not village or quantity == "" or price == "":
        return Response({"message": "All fields are required"}, status=400)

    crop = CropUpload.objects.create(
        farmer_name=farmer_name,
        crop_name=crop_name,
        village=village,
        quantity=int(quantity),
        price=int(price),
        status="Available"
    )

    return Response({
        "message": "Crop uploaded successfully",
        "crop": CropUploadSerializer(crop).data
    }, status=201)


@api_view(['DELETE'])
def delete_crop_upload(request, id):
    try:
        crop = CropUpload.objects.get(id=id)
        crop.delete()
        return Response({"message": "Crop deleted successfully"})

    except CropUpload.DoesNotExist:
        return Response({"message": "Crop not found"}, status=404)


@api_view(['PUT'])
def mark_crop_sold(request, id):
    try:
        crop = CropUpload.objects.get(id=id)
        crop.status = "Sold"
        crop.save()

        return Response({"message": "Crop marked as sold"})

    except CropUpload.DoesNotExist:
        return Response({"message": "Crop not found"}, status=404)


@api_view(['GET'])
def market_prices(request):
    prices = MarketPrice.objects.all().order_by("-id")
    serializer = MarketPriceSerializer(prices, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_market_price(request):
    serializer = MarketPriceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Market price added successfully"}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def edit_market_price(request, id):
    try:
        price = MarketPrice.objects.get(id=id)
        serializer = MarketPriceSerializer(price, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Price updated successfully"})

        return Response(serializer.errors, status=400)

    except MarketPrice.DoesNotExist:
        return Response({"message": "Price not found"}, status=404)


@api_view(['DELETE'])
def delete_market_price(request, id):
    try:
        price = MarketPrice.objects.get(id=id)
        price.delete()
        return Response({"message": "Price deleted successfully"})

    except MarketPrice.DoesNotExist:
        return Response({"message": "Price not found"}, status=404)


@api_view(['GET'])
def schemes(request):
    data = GovernmentScheme.objects.all().order_by("-id")
    serializer = GovernmentSchemeSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_scheme(request):
    serializer = GovernmentSchemeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Scheme added successfully"}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_scheme(request, id):
    try:
        scheme = GovernmentScheme.objects.get(id=id)
        scheme.delete()
        return Response({"message": "Scheme deleted successfully"})

    except GovernmentScheme.DoesNotExist:
        return Response({"message": "Scheme not found"}, status=404)


@api_view(['GET'])
def weather_prediction(request):
    return Response({
        "location": "Kuppam",
        "temperature": "31°C",
        "condition": "Partly Cloudy",
        "humidity": "62%",
        "wind_speed": "12 km/h"
    })


@api_view(['POST'])
def disease_detection(request):
    return Response({
        "disease": "Leaf Blight",
        "cause": "Fungal Infection",
        "solution": "Apply fungicide and avoid excess water.",
        "tip": "Remove infected leaves and maintain spacing."
    })