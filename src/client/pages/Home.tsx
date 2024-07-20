import Html from "@kitajs/html";
import { MainLayout } from "../layouts/MainLayout";

export const Home = () => {
  return (
    <MainLayout>
      <div class="text-bg-danger text-primary bg-dark">salman</div>
      <div>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButtonLight"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Default dropdown
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
          <li>
            <a class="dropdown-item active" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
};
