import { test, expect } from "@playwright/test";
import { globalConfig } from "../global-config";

test.describe("Recruitment task", () => {
  const userEmail: string = globalConfig.TEST_USER_EMAIL as string;
  const userPassword: string = globalConfig.TEST_USER_PASSWORD as string;

  test.beforeEach(async ({ page }) => {
    const emailInput = page.getByLabel("Email", { exact: true });
    const passwordInput = page.getByLabel("Password");
    const signInButton = page.getByRole("button", { name: "Sign In" });

    await page.goto("./customer/account/login");
    await emailInput.fill(userEmail);
    await passwordInput.fill(userPassword);
    await signInButton.click();
  });

  test.afterEach(async ({ page }) => {
    const userMenuDropdown = page
      .getByRole("banner")
      .locator("button")
      .filter({ hasText: "Change" });
    const signOutButton = page.getByRole("link", { name: "Sign Out" });

    await userMenuDropdown.click();
    await signOutButton.click();
  });

  test("should add an example product to the cart and remove it", async ({
    page,
  }) => {
    // Given
    const productName: string = "Luma Analog Watch";
    const searchProductField = page.getByPlaceholder(
      "Search entire store here..."
    );
    const productLink = page
      .getByRole("link", { name: `${productName}` })
      .first();
    const addProductButton = page.getByRole("button", { name: "Add to Cart" });
    const notificationMessage = page.getByRole("alert");
    const shoppingCartLink = page.getByRole("link", { name: "shopping cart" });
    const productDetailsTable = page.locator("#shopping-cart-table");
    const removeButtonItem = page.getByTitle("Remove item");
    // When
    await searchProductField.fill(productName);
    await searchProductField.press("Enter");
    await productLink.click();
    await addProductButton.click();
    // Then
    await expect(notificationMessage).toHaveText(
      "You added Luma Analog Watch to your shopping cart."
    );
    // When
    await shoppingCartLink.click();
    // Then
    await expect(productDetailsTable.locator("tr")).toHaveCount(3);
    await expect(productDetailsTable.locator(".product-item-name")).toHaveText(
      productName
    );
    await expect(
      productDetailsTable.locator("[data-th='Price'] .price")
    ).toHaveText("$43.00");
    await expect(productDetailsTable.locator(".input-text.qty")).toHaveValue(
      "1"
    );
    await expect(
      productDetailsTable.locator("[data-th='Subtotal'] .price")
    ).toHaveText("$43.00");
    // When
    await removeButtonItem.click();
    // Then
    await page.waitForLoadState();
    await expect(
      page.getByText(
        "You have no items in your shopping cart. Click here to continue shopping."
      )
    ).toBeVisible();
  });
});
