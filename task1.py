
# Assume that the length of the given list is not always 3 or more
def highest_product(liste):
    try:
        liste.sort()
        return max(liste[-1]*liste[-2]*liste[-3], liste[0]*liste[1]*liste[-1])
    except:
        return "List too short"


import unittest

class TestHighestProduct(unittest.TestCase):

    def test_product(self):
        data = [1, 10, 2, 6, 5, 3]
        result = highest_product(data)
        self.assertEqual(result, 300)
        
    def test_product2(self):
        data = [1, 2, 3, 4, 5]
        result = highest_product(data)
        self.assertEqual(result, 60)
        
    def test_product_negative(self):
        data = [-1, -10, -2, -6, -5, -3]
        result = highest_product(data)
        self.assertEqual(result, -6)
    
    def test_product_negative2(self):
        data = [1, 0, -1, -2, -3, -4, -5]
        result = highest_product(data)
        self.assertEqual(result, 20)
   
    def test_short_list(self):
        data = [1, 2]
        result = highest_product(data)
        self.assertEqual(result, "List too short")
        
if __name__ == "__main__":
    unittest.main()
