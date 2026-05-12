# Container-Presenter Pattern in React

## Overview

The Container-Presenter pattern (also known as Smart-Dumb or Container-Component pattern) is a design pattern for organizing React components into two distinct types:

1. **Container Components (Smart Components)** - Handle business logic, state management, and data fetching
2. **Presenter Components (Dumb Components)** - Focus purely on UI rendering and accept data via props

This pattern promotes better separation of concerns, improved code reusability, and easier testing.

---

## Core Concepts

### Container Components (Smart Components)

**Purpose:** Manage application logic and state

**Characteristics:**
- Handle state management (useState, useReducer, Context API, Redux, etc.)
- Fetch data from APIs or services
- Implement business logic and calculations
- Pass data and callbacks to presenter components
- Rarely have their own styling
- Connected to external data sources

**Example Structure:**
```typescript
// UserContainer.tsx
import { useState, useEffect } from 'react';
import UserPresenter from './UserPresenter';
import { fetchUserData } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserContainer = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(userId);
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    // Additional logic for update
  };

  return (
    <UserPresenter
      user={user}
      loading={loading}
      error={error}
      onUpdate={handleUserUpdate}
    />
  );
};
```

### Presenter Components (Dumb Components)

**Purpose:** Display UI based on received props

**Characteristics:**
- Receive all data via props
- Contain no business logic
- Are pure components (same props = same render)
- Easy to test
- Highly reusable
- Focus on rendering and user interaction callbacks

**Example Structure:**
```typescript
// UserPresenter.tsx
import { FC } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserPresenterProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  onUpdate: (user: User) => void;
}

const UserPresenter: FC<UserPresenterProps> = ({
  user,
  loading,
  error,
  onUpdate,
}) => {
  if (loading) {
    return <div className="loader">Loading user data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="no-data">No user found</div>;
  }

  const handleUpdate = () => {
    const updatedUser = { ...user, name: user.name.toUpperCase() };
    onUpdate(updatedUser);
  };

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <button onClick={handleUpdate}>Update User</button>
    </div>
  );
};

export default UserPresenter;
```

---

## Benefits

| Benefit | Explanation |
|---------|-------------|
| **Separation of Concerns** | Logic is separated from presentation, making code easier to understand and maintain |
| **Reusability** | Presenter components can be reused with different container components or data sources |
| **Testability** | Presenter components are easier to test (pure functions with no side effects) |
| **Scalability** | Easy to swap out containers without changing presenter UI |
| **Flexibility** | Multiple containers can share the same presenter, or one container can manage multiple presenters |
| **Code Organization** | Clear structure makes the codebase more maintainable as it scales |

---

## Disadvantages

- **More Boilerplate:** Requires creating two components instead of one
- **Overhead:** For simple components, the pattern might be unnecessary
- **Prop Drilling:** Can lead to passing many props down the component tree
- **Learning Curve:** Team members need to understand the pattern for consistency

---

## When to Use

✅ **Use this pattern when:**
- Building applications with complex state management
- You have multiple components that need the same data
- You want to test UI and logic independently
- Team is large and needs clear code structure
- Component reusability is a priority

❌ **Avoid this pattern when:**
- Building very simple UI components
- Working on small projects
- The overhead isn't justified by complexity

---

## Modern Alternatives

While the Container-Presenter pattern is still valuable, modern React offers alternatives:

### 1. **Custom Hooks**
Extract logic into custom hooks instead of container components:

```typescript
// useUser.ts
import { useState, useEffect } from 'react';

export const useUser = (userId: number) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic here
  }, [userId]);

  return { user, loading, error };
};

// User.tsx - Presenter Component
const User = ({ userId }: { userId: number }) => {
  const { user, loading, error } = useUser(userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{user.name}</div>;
};
```

### 2. **Context API + Custom Hooks**
Combine Context API with custom hooks for state management without separate containers.

### 3. **State Management Libraries**
Use Redux, Zustand, or Jotai to manage state globally, reducing the need for container components.

---

## Real-World Example

Here's a complete example with a list container and presenter:

```typescript
// ProductListContainer.tsx
import { useState, useEffect } from 'react';
import ProductListPresenter from './ProductListPresenter';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export const ProductListContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Simulate API call
    const mockProducts: Product[] = [
      { id: 1, name: 'Laptop', price: 999, inStock: true },
      { id: 2, name: 'Mouse', price: 29, inStock: false },
      { id: 3, name: 'Keyboard', price: 79, inStock: true },
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <ProductListPresenter
      products={sortedProducts}
      onFilterChange={setFilter}
      onSortChange={setSortBy}
      currentFilter={filter}
      currentSort={sortBy}
    />
  );
};
```

```typescript
// ProductListPresenter.tsx
import { FC } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductListPresenterProps {
  products: Product[];
  onFilterChange: (filter: string) => void;
  onSortChange: (sortBy: string) => void;
  currentFilter: string;
  currentSort: string;
}

const ProductListPresenter: FC<ProductListPresenterProps> = ({
  products,
  onFilterChange,
  onSortChange,
  currentFilter,
  currentSort,
}) => {
  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      
      <select value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      <ul>
        {products.map((product) => (
          <li key={product.id} className={!product.inStock ? 'out-of-stock' : ''}>
            <span>{product.name}</span>
            <span>${product.price}</span>
            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPresenter;
```

---

## Best Practices

1. **Keep Presenters Pure:** Don't add logic or side effects to presenter components
2. **Use TypeScript:** Define clear interfaces for props to avoid prop drilling confusion
3. **Name Consistently:** Use `*Container` and `*Presenter` or `*` and `*View` naming conventions
4. **Consider Custom Hooks:** For smaller components, custom hooks might be simpler
5. **Avoid Over-Engineering:** Not every component needs this pattern
6. **Document Props:** Use JSDoc comments to document what each prop does

---

## React + TypeScript + Vite Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react) and add the rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Resources

- [React Patterns Documentation](https://reactpatterns.com/)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React Compiler Documentation](https://react.dev/learn/react-compiler)
