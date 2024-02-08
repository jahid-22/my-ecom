from django.db import models
from django.urls import reverse
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from category.models import Category, Subcategory
from account.models import User

# featured category
class Featured_category(models.Model):
    name    = models.CharField(max_length=100, unique=True)
    image   = models.ImageField(upload_to ="featured_image/")
    created_date    = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Featured_category'
        verbose_name_plural = 'Featured_categories'
    
    def __str__(self):
        return self.name
    
# Brand Model. 
class Brand(models.Model):
    name               = models.CharField(max_length=100)
    image_link       = models.ImageField(upload_to = 'brand/')
    
    def __str__(self):
        return self.name
    

# Product Model.
class Product(models.Model):
    FEATURE_CHOICE = (
        ("new arrival", "new arrival"),
        ("new arrival gadget", "new arrival gadget"),
        ("deal of the day", "deal of the day"),
        ("best deal", "best deal"),
        ("best sellers", "best sellers"),
    )
    
    name                = models.CharField(max_length=200, unique=True)
    price                 = models.IntegerField()
    discounted_price  = models.FloatField()
    offer_percent    = models.CharField(max_length=20, blank=True,help_text="this can be blank")
    img                   = models.ImageField(upload_to='project_images/')
    category           = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory      = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    featured_category = models.ForeignKey(Featured_category, on_delete=models.CASCADE, blank=True, null=True, help_text="this can be blank")
    in_stock            = models.IntegerField()
    availabe            = models.BooleanField(default=True)
    brand                = models.ForeignKey(Brand, on_delete=models.CASCADE, default='No brand', null=True, blank=True)
    model               = models.CharField(max_length=30, default='No model')
    ratings             = models.CharField(max_length=6, null=True, blank=True, default=1)
    sold             = models.IntegerField(null=True, blank=True, default=1)
    feature_product= models.CharField(max_length=200, choices=FEATURE_CHOICE, blank=True,help_text="this can be blank")
    created_date     = models.DateField(auto_now_add=True,help_text="this can be blank")
    Product_information = RichTextField()
    Description        = RichTextUploadingField()
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse("sitemap", args={self.name})
    
    
# product images 
class Product_images(models.Model):
    product          = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image                   = models.ImageField(upload_to='project_images/')
    
    def __str__(self):
        return self.product.name
    
    
class ProductView(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ["-created_at"]  # Order records by created_at in descending order
        verbose_name = "ProductView"
        verbose_name_plural = "landing_page"






