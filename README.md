# <img src="https://i.ibb.co/jZ3pgnS/logo.webp" title="logo" width="35"> Jarvis 2.0

**Jarvis 2.0** is a modern ERP and CRM software solution designed to seamlessly integrate and manage both enterprise resource planning and customer relationship management functionalities in a single platform. This project aims to deliver an efficient, scalable, and user-friendly system that helps organizations optimize their operations and improve customer engagement.

**Features of Jarvis 2.0:**

- **Unified Interface:** Combines ERP and CRM in one cohesive interface for ease of use.
- **Customization:** Allows customization to fit the unique needs of different industries.
- **Automation:** Implements advanced automation for repetitive tasks in both ERP and CRM processes.
- **Advanced Analytics:** Provides comprehensive analytics for business insights and decision-making.
- **Cloud Integration:** Offers cloud-based access for flexibility and remote work.
  **Jarvis 2.0** is developed to enhance business efficiency, provide deeper insights into operations and customer interactions, and support the growth and scalability of modern businesses.

# Table of Contents

- [Folder Structure](#FolderStructure)
- [Documentation](#Documentation)

## Folder Structure

```
├───Components
│ ├───CommonComponent
│ │ ├───CustomTable
│ │ │ └───TableComponent
│ │ ├───DeleteButton
│ │ ├───FormElement
│ │ ├───Layout
│ │ ├───Loader
│ │ ├───OfflinePage
│ │ ├───Outstanding
│ │ ├───PageNotFound
│ │ ├───SideBar
│ │ ├───Tab
│ │ ├───ThemeBar
│ │ ├───TopBar
│ │ └───View
│ ├───Community
│ ├───Execution
│ ├───Finance
│ ├───Inventory
│ │ ├───CommonComponent
│ │ └───page-name
│ ├───Operation
│ ├───Sales
│ │ ├───CommonComponent
│ │ │ └───Incentive
│ │ ├───dashboard
│ │ ├───salesAccount
│ │ └───SalesBooking
│ ├───Sarcasm
│ └───User
├───Context
├───ErrorBoundary
├───Pages
│ ├───Community
│ ├───Dummy
│ ├───Execution
│ ├───Finance
│ ├───Inventory
│ ├───Login
│ ├───Sales
│ │ ├───Account
│ │ │ └───AccountProfile
│ │ ├───Dashboard
│ │ ├───Documents
│ │ ├───Incentive
│ │ ├───InvoiceRequests
│ │ ├───Outstanding
│ │ ├───Payment
│ │ │ ├───PaymentDetail
│ │ │ ├───PaymentMode
│ │ │ └───PaymentUpdate
│ │ ├───Poc
│ │ ├───SalesBooking
│ │ ├───SalesReport
│ │ ├───Services
│ │ └───TargetCompetetion
│ ├───Sarcasm
│ ├───UI
│ └───User
├───Redux
│ ├───Slices
│ │ ├───BreadCrumbSlices
│ │ ├───CommunitySlices
│ │ ├───CountryCodeSlices
│ │ ├───ExecutionSlices
│ │ ├───FinanceSlices
│ │ ├───GstSlices
│ │ ├───InventorySlices
│ │ ├───LoginSlices
│ │ ├───NotificationSlices
│ │ ├───OperationSlices
│ │ ├───SalesSlices
│ │ ├───SarcasmSlices
│ │ ├───ThemeSlices
│ │ └───UserSlices
│ └───Store
├───Routes
└───Util
```

## Documentation

### CUSTOM COMPONENTS

- [**CUSTOM SELECT**](#CustomSelect)
- [**PAGE HEADER**](#PageHeader)
- [**DYNAMIC SELECT**](#DynamicSelect)
- [**FIELD CONTAINER**](#FieldContainer)
- [**VIEW**](#View)
- [**TAB**](#Tab)

# CustomSelect

## Overview

`CustomSelect` is a reusable component that provides a customizable select/dropdown interface, supporting both single and multiple selection modes. It integrates with Material-UI's `Autocomplete` component and can be enhanced with additional features such as filtering options and rendering custom children elements.

## Props

### Required Props

- **`label`** (`string`): The label for the input field.
- **`dataArray`** (`Array<object>`): An array of objects representing the available options. Each object should contain keys corresponding to `optionId` and `optionLabel`. This prop is required and must be provided by the user.
- **`optionId`** (`string`): The key used to uniquely identify each option.
- **`optionLabel`** (`string`): The key used to display the label of each option.
- **`selectedId`** (`string` or `Array<string>`): The currently selected option(s). For multiple selections, an array of selected option IDs is used.
- **`setSelectedId`** (`function`): A function to update the selected option(s).

### Optional Props

- **`disabled`** (`boolean`): If `true`, the select field is disabled. Default is `false`.
- **`multiple`** (`boolean`): If `true`, the select allows multiple options to be selected. Default is `false`.
- **`filterOption`** (`function`): A custom filter function for the options.
- **`children`** (`ReactNode`): Additional elements to be rendered inside the wrapper.
- **`required`** (`boolean`): If `true`, the input field is required. Default is `false`.

## Internal Logic

### `findOptionLabelById`

A helper function to find the label of an option by its ID.

### `selectAllOption`

An object representing the "Select All" option, which is used when `multiple` is `true`.

### `isAllSelected`

A boolean indicating if all options are currently selected.

### `valueProp`

The value to be passed to the `Autocomplete` component, which varies based on whether the `multiple` prop is `true` or `false`.

### `handleChange`

Handles changes in selection. If `multiple` is `true`, it manages the logic for selecting or deselecting all options.

### `options`

The array of options to be passed to the `Autocomplete` component, including the "Select All" option if `multiple` is `true`.

## Rendering

### `Wrapper`

Determines the outer wrapper for the component. If `children` is provided, it uses a `FormGroup`; otherwise, it uses a `div`.

### `Autocomplete`

A Material-UI `Autocomplete` component that renders the select input, supporting multiple selections and custom rendering of options.

- **`multiple`**: Whether multiple selections are allowed.
- **`disableCloseOnSelect`**: Prevents closing the dropdown on selecting an option when `multiple` is `true`.
- **`options`**: The array of options.
- **`value`**: The current selection(s).
- **`onChange`**: The function to handle changes in selection.
- **`getOptionLabel`**: Function to get the label of an option.
- **`isOptionEqualToValue`**: Function to determine if an option is equal to the current value.
- **`disabled`**: Disables the input field.
- **`filterOptions`**: Custom filter function for options.
- **`renderInput`**: Custom rendering for the input field, using `TextField`.
- **`renderOption`**: Custom rendering for each option, including a checkbox for multiple selections.

## Usage Example

```jsx
<CustomSelect
  label="Select Items"
  dataArray={itemsArray}
  optionId="id"
  optionLabel="name"
  selectedId={selectedItems}
  setSelectedId={setSelectedItems}
  multiple={true}
  required={true}
/>
```

# PageHeaer

## Overview

`PageHeader` is a component designed to display a header section for a page, including the main title, breadcrumb navigation, and action buttons or links. It utilizes React hooks and Redux to manage state and navigation.

## Props

### Required Props

- **`mainTitle`** (`string`): The main title displayed at the top of the page.

### Optional Props

- **`children`** (`ReactNode`): Additional elements to be rendered inside the header.
- **`LinkButtons`** (`Array<object>`): An array of objects representing buttons, links, or custom elements to be rendered in the header. Each object can have the following keys:
  - **`type`** (`string`): Specifies the type of item (`button`, `link`, or `element`).
  - **`name`** (`string`): The display name of the button or link.
  - **`link`** (`string`): The URL path for the link (only for `link` type).
  - **`element`** (`ReactNode`): Custom element to be rendered (only for `element` type).
  - **`access`** (`Array<number>`): An array of roles that can access the item.
  - **`condition`** (`function`): A function that returns a boolean to determine if the item should be displayed.
  - **`color`** (`string`): The color of the button (only for `button` type, default is `primary`).
  - **`variant`** (`string`): The variant of the button (only for `button` type, default is `contained`).
  - **`title`** (`function`): A function that returns the title of the button (only for `button` type).
  - **`disabled`** (`function`): A function that returns a boolean to disable the button (only for `button` type).
  - **`onClick`** (`function`): A function to handle the button's click event (only for `button` type).

## Internal State and Hooks

### State Variables

- **`pathnames`** (`Array<string>`): Stores the pathnames for breadcrumb navigation.
- **`buttons`** (`Array<object>`): Stores the filtered `LinkButtons` of type `button`.
- **`links`** (`Array<object>`): Stores the filtered `LinkButtons` of type `link`.
- **`elements`** (`Array<object>`): Stores the filtered `LinkButtons` of type `element`.

### Hooks Used

- **`useLocation`**: Provides the current location object.
- **`useNavigate`**: Provides the navigation function to programmatically navigate to different routes.
- **`useDispatch`**: Provides the Redux dispatch function.
- **`useSelector`**: Selects state from the Redux store.

## Effects

### `useEffect` for Filtering `LinkButtons`

Filters the `LinkButtons` prop into `buttons`, `links`, and `elements` based on their `type`.

### `useEffect` for Updating Previous Route

Updates the previous route in the Redux store whenever the location changes.

### `useEffect` for Setting Pathnames

Sets the `pathnames` state from the `previousRoute` Redux state.

## Rendering

### `PageHeader`

A `div` element that wraps the main content of the `PageHeader` component.

### `pageTitle`

- Displays the `mainTitle` as an `h2` element.
- Contains a `Breadcrumbs` component to display the breadcrumb navigation.

### `pageAction`

- Renders links, elements, and buttons based on the `LinkButtons` prop.
- **Links**: Rendered as `li` elements inside an `ul`.
- **Elements**: Rendered inside a `div`.
- **Buttons**: Rendered using the Material-UI `Button` component.

## Functions

### `handleClick`

Navigates to a specified path using the `useNavigate` hook.

## Usage Example

```jsx
<PageHeader
  mainTitle="Dashboard"
  LinkButtons={[
    {
      type: "button",
      name: "Add Item",
      onClick: handleAddItem,
      access: [1, 2],
    },
    {
      type: "link",
      name: "Home",
      link: "/home",
      access: [1, 2, 3],
    },
    {
      type: "element",
      element: <CustomComponent />,
      access: [2, 3],
    },
  ]}
/>
```

# DynamicSelect

## Overview

`DynamicSelect` is a flexible and customizable select component built using Material-UI's `Autocomplete`. It allows users to select a value from a provided list of options and supports optional features like placeholders and required validation.

## Props

### Required Props

- **`data`** (`Array<string>`): The array of options to display in the dropdown menu.
- **`onChange`** (`function`): The callback function triggered when the selected value changes. It receives the new value as its argument.
- **`value`** (`string` | `null`): The currently selected value. Defaults to `null` if not provided.
- **`label`** (`string`): The label displayed above the input field.

### Optional Props

- **`required`** (`boolean`): Whether the field is required. Defaults to `false`.
- **`placeholder`** (`string`): The placeholder text displayed when no value is selected. Defaults to "Select".
- **`children`** (`ReactNode`): Additional elements to be rendered within the component, typically for custom layouts or additional functionality.

## Internal Logic and Behavior

### Wrapper Selection

- The `Wrapper` variable determines the outer wrapper of the component. If `children` is provided, the wrapper is a `FormGroup`. Otherwise, it defaults to a `div`.

### Autocomplete Component

- The `Autocomplete` component is used to create the dropdown menu. It:
  - Uses the `options` prop to receive the `data` array.
  - Uses the `getOptionLabel` function to display each option as a string.
  - Manages the `value` prop to reflect the currently selected option.
  - Triggers the `onChange` prop function when a new option is selected.
  - Ensures equality between options and selected values using `isOptionEqualToValue`.

### Input Field

- The `TextField` component within `renderInput` provides the text input field for the `Autocomplete`. It:
  - Displays the `label` and `placeholder`.
  - Applies the `required` attribute if the `required` prop is `true`.
  - Uses the `fullWidth` prop to make the input field stretch across the container's full width.

## Usage Example

```jsx
<DynamicSelect
  data={["Option 1", "Option 2", "Option 3"]}
  value="Option 1"
  onChange={(newValue) => console.log("Selected:", newValue)}
  label="Choose an Option"
  required={true}
  placeholder="Select an option..."
/>
```

# FieldContainer

## Overview

`FieldContainer` is a versatile component for rendering various types of form fields, including text inputs, textareas, selects, and date pickers. It provides a flexible way to manage form inputs with additional features like date formatting and custom event handling.

## Props

### General Props

- **`label`** (`string`): The label for the input field.
- **`Tag`** (`string` | `React.Component`): The type of HTML tag or React component to render. Default is `"input"`.
- **`type`** (`string`): The input type (e.g., `text`, `number`, `date`). Default is `"text"`.
- **`value`** (`any`): The current value of the input field.
- **`onChange`** (`function`): Callback function called when the input value changes.
- **`onBlur`** (`function`): Callback function called when the input loses focus.
- **`onKeyUp`** (`function`): Callback function called on key up events.
- **`required`** (`boolean`): Whether the input is required. Default is `false`.
- **`disabled`** (`boolean`): Whether the input is disabled. Default is `false`.
- **`placeholder`** (`string`): Placeholder text for the input.
- **`name`** (`string`): The name attribute of the input.
- **`refer`** (`React.Ref`): A reference to the input element.
- **`children`** (`ReactNode`): Additional elements to render inside the component.

### Number and Range Props

- **`step`** (`string`): The step increment for numeric inputs. Default is `"any"`.
- **`min`** (`string` | `number`): The minimum value for numeric inputs.
- **`max`** (`string` | `number`): The maximum value for numeric inputs.

### Text Props

- **`rows`** (`number`): The number of rows for textarea inputs.
- **`cols`** (`number`): The number of columns for textarea inputs.
- **`maxLength`** (`number`): The maximum length of the input value.

### File Input Props

- **`multiple`** (`boolean`): Whether multiple files can be selected (for file inputs).
- **`accept`** (`string`): The accepted file types (for file inputs).

### Date Picker Props

- **`format`** (`string`): The date format string. Default is `"DD/MM/YYYY"`.

### Customization Props

- **`children`** (`ReactNode`): Any child elements to render within the component.

## Date Handling

The component uses `dayjs` for date formatting. The `handleDateChange` function formats the date based on the specified format and calls `onChange` with the formatted date.

## Usage Example

### Basic Usage

```jsx
<FieldContainer
  label="Username"
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
  placeholder="Enter your username"
/>
```

### Date Picker

```jsx
<FieldContainer
  label="Date of Birth"
  type="date"
  value={dob}
  onChange={setDob}
  format="YYYY-MM-DD"
/>
```

# View

## Overview

The `View` component is designed to display tabular data using a customizable table layout. It integrates with a `CustomTable` component and provides options for features like pagination, row selection, and loading states.

## Props

### Required Props

- **`data`** (`array`): The array of data objects to be displayed in the table.
- **`columns`** (`array`): An array of column definitions that describe how each column should be rendered.

- **`isLoading`** (`boolean`): Indicates whether the table data is currently loading. Default is `false`.
- **`title`** (`string`): The title of the table, displayed in the header.
- **`tableName`** (`string`): A unique identifier for the table, useful for managing state or interactions.

### Optional Props

- **`rowSelectable`** (`boolean`): Enables or disables the row selection feature. Default is `false`.
- **`pagination`** (`boolean`): Enables or disables the pagination feature. Default is `false`.

- **`selectedData`** (`array`): An array of selected data rows is returned , used when row selection is enabled.
- **`showTotal`** (`boolean`): Displays the total count of rows in the table. Default is `false`.
- **`addHtml`** (`ReactNode`): Display the custom element in header.

## Internal Structure

The `View` component is composed of the following parts:

- **`CustomTableWrapper`**: A wrapper component that provides a card-like structure with a header and body.
- **`CustomTable`**: The core table component that renders the data, column headers, and optional features like pagination and row selection.

## Usage Example

```jsx
<View
  data={myData}
  columns={myColumns}
  isLoading={isDataLoading}
  title="User Data"
  rowSelectable={true}
  pagination={true}
  tableName="userTable"
  selectedData={selectedRows}
  showTotal={true}
  addHtml={
    loginUserRole === 1 && (
      <CustomSelect
        dataArray={[
          { sales_category_id: null, sales_category_name: "None" },
          ...(categoryDetails || []),
        ]}
        optionId="sales_category_id"
        optionLabel="sales_category_name"
        selectedId={selectedCategory}
        setSelectedId={setSelectedCategory}
      />
    )
  }
/>
```

# Tab

## Overview

The `Tab` component is a wrapper around the Material-UI `Tabs` and `Tab` components, designed to render a set of tabs that can be used for navigation or displaying different content sections. It provides an easy way to handle tab switching with customizable tab labels and an active tab indicator.

## Props

### Required Props

- **`tabName`** (`array` of `string`): An array of strings representing the names of the tabs to be displayed.
- **`activeTabindex`** (`number`): The index of the currently active tab, used to control which tab is selected.
- **`onTabClick`** (`function`): A callback function that is called when a tab is clicked. It receives the new active tab index as a parameter.

## Internal Functionality

### `handleChange`

This function is called when the active tab changes. It takes two parameters:

- `event`: The event object from the tab change event.
- `newValue`: The new active tab index.

It calls the `onTabClick` prop function with the new active tab index.

## Rendering

The component renders a Material-UI `Tabs` component containing multiple `Tab` components, each corresponding to an item in the `tabName` array. The `Tabs` component uses the `activeTabindex` to determine which tab is currently active and applies the appropriate styling.

### Key Elements

- **`Tabs`**: The container for the individual tabs.
  - **`value`**: Set to `activeTabindex` to control the selected tab.
  - **`onChange`**: Set to `handleChange` to manage tab switching.
  - **`aria-label`**: Provides an accessible label for the tab component.
- **`MTab`**: The individual tab elements, each rendered with a label from the `tabName` array.

## Usage Example

```jsx
import React, { useState } from "react";
import Tab from "./Tab";

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Home", "Profile", "Settings"];

  const handleTabClick = (newIndex) => {
    setActiveTab(newIndex);
  };

  return (
    <Tab
      tabName={tabs}
      activeTabindex={activeTab}
      onTabClick={handleTabClick}
    />
  );
};

export default MyComponent;
```

test
