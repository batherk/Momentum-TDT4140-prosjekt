from django.test import TestCase
from api.models.user import User
from api.models.role import Role

class UserTest(TestCase):
    def setUp(self):
        User.objects.create(first_name="Ola", last_name="Nordmann")


    def test_get_full_name(self):
        user = User.objects.get(first_name="Ola")
        self.assertIsInstance(user,User)
        self.assertEqual(user.get_full_name(), "Ola Nordmann")
        self.assertNotEqual(user.get_full_name(), "OlaNordmann")

class RoleTest(TestCase):
    def setUp(self):
        Role.objects.create(name="Business Owner")

    def test_is_business_owner(self):
        role = Role.objects.get(name="Business Owner")
        self.assertTrue(role.is_business_owner)
        self.assertFalse(role.is_investor)
        self.assertFalse(role.is_applicant)
