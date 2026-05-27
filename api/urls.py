from django.urls import path
from . import views

urlpatterns = [
    path('admin/login/', views.admin_login),

    path('farmer/signup/', views.farmer_signup),
    path('farmer/login/', views.farmer_login),
    path('farmer/forgot-password/', views.forgot_password),

    path('farmers/', views.farmers_list),
    path('farmers/delete/<int:id>/', views.delete_farmer),

    path('crop/upload/', views.upload_crop),
    path('crop/uploads/', views.crop_uploads),
    path('crop/delete/<int:id>/', views.delete_crop_upload),
    path('crop/sold/<int:id>/', views.mark_crop_sold),

    path('market/prices/', views.market_prices),
    path('market/prices/add/', views.add_market_price),
    path('market/prices/edit/<int:id>/', views.edit_market_price),
    path('market/prices/delete/<int:id>/', views.delete_market_price),

    path('schemes/', views.schemes),
    path('schemes/add/', views.add_scheme),
    path('schemes/delete/<int:id>/', views.delete_scheme),

    path('weather/', views.weather_prediction),
    path('disease/detect/', views.disease_detection),
]